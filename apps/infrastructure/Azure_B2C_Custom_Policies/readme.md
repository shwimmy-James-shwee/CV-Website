# Steps to create the B2C custom policy

## Step 1: setup Policy Keys

`https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-custom-policy#register-identity-experience-framework-applications`

follow the tutorial to create the `TokenSigningKeyContainer` and the `TokenEncryptionKeyContainer`

create the

`AdminClientEncryptionKeyContainer`, generate -> RSA -> encryption -> save

`AccountTransformSecret`, generate -> Secret -> sign -> save

`GoogleSecret`, manual -> fill in secret -> sign -> save

`MSASecret`, manual -> fill in secret -> sign -> save

`KPMGADSecret`, manual -> fill in secret -> sign -> save

## Step 2: setup the app registration

follow the tutorial to create the the `IdentityExperienceFramework` and `ProxyIdentityExperienceFramework` app registration. These are required for the local account creation and query.

note down the `IdentityExperienceFramework` clientId as `localAccountAppAudienceResourceId` in the `param.py` for replace script later, also the same for `ProxyIdentityExperienceFramework` clientId as `localAccountAppClientId` and objectId as `localAccountAppObjectId`

## Step 3: complete and run the param.py with correct values

Clone the [params-sample.py](../params-sample.py) to `param.py` then update the values.

```json
{
    "b2cTenantName": "taxctdev",
    "googleSSOClientId": "dummyid", # come from ITS google app registration
    "kpmgSSOClientId": "dummyid", # come from Global app registration kpmg tenant AAD
    "kpmgSSOTenantId": "dummyid", # come from Global app registration kpmg tenant AAD
    "microsoftSSOClientId": "dummyid", # come from App Registration in B2C Tenant
    "localAccountAppClientId": "dummyid", # from the ProxyIdentityExperienceFramework
    "localAccountAppObjectId": "dummyid", # from the ProxyIdentityExperienceFramework
    "localAccountAppAudienceResourceId": "dummyid", # from the IdentityExperienceFramework
    "passwordHistoryCheckEndpoint": "https://taxct-be-dev-staging.azurewebsites.net/api/v1/pwd-history-check", # from the Backend API
    "passwordExpireInSeconds": "3600",  # prod should be 90days X 3600 X 24
    "bannedPasswordsXML": banned_pws_xml, # content is dynamically generated base on the banned_password_list.txt
    "AppInsightInstrumentationKeyForB2C": "dummy-app-insight-inst-key", # App Insight to trace login activity/errors
    "AppInsightDeveloperModeForB2C": "false",  # true for dev (a lot more verbose log)
}
```

```bash
# execute the makePolicyForEnv.py
python makePolicyForEnv.py
```

under the `tmp` folder, it should now contain all the custom policies with the right values replaced

## Step 4: upload the custom polcies

in order

1. TrustFrameworkBase.xml
2. TrustFrameworkLocalization.xml
3. TrustFrameworkExtensions.xml
4. TrustFrameworkExtensions_TOTP.xml
5. SignUpOrSignIn_TOTP.xml
6. PasswordReset.xml

# Prerequisite for Password History, Backend API to provide the password history function

## 2 scenario

1. password is not in the X history, return 200
2. password is in the X hisotry, return 409 with json return

```prisma
# object structure for the pwd api
model PasswordHistory {
  id        Int      @id @default(autoincrement())
  username  String
  hash      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```typescript
// API to provide B2C to check if the hashed string exist for particular user
const PASS_PASSWORD_COUNT = 14;

type PasswordHistoryBody = PasswordHistoryGetPayload & { passphrase: string };
@Controller('/pwd-history-check')
export class PasswordHistory {
  @Post('/')
  @Returns(200)
  @Returns(409).Description('Duplicate')
  @Example({
    username: 'freeguy',
    hash: 'awfqwfbc123',
    passphrase: 'passphrase',
  })
  public async checkPasswordHash(
    @Req() request: Req,
    @Res() response: Res,
    @BodyParams() @Groups('creation') body: PasswordHistoryBody,
  ) {
    if (env.KPMG_SSO_IDENTIFIER !== body.passphrase) {
      return new BadRequest('missing passphrase');
    }
    if (!body.username || !body.hash) {
      return new BadRequest('missing username or hash');
    }
    const existingPasswordHash = await dao.findInLast({
      username: body.username,
      lastCount: PASS_PASSWORD_COUNT,
    });
    const hashInHistory = existingPasswordHash.some(
      (pwd) => pwd.hash === body.hash,
    );

    const duplicateReturn = {
      version: '1.0.0',
      status: 409,
      code: 'HISTORY001',
      userMessage: `You cannot reuse the past ${PASS_PASSWORD_COUNT} passwords`,
      developerMessage: 'User password found in history list',
      requestId: request.id,
      moreInfo: null,
    };
    if (!hashInHistory) {
      await dao.create({
        username: body.username,
        hash: body.hash,
      } as PasswordHistoryGetPayload);
      return;
    }
    return response.status(409).send(duplicateReturn);
  }
}
```

```typescript
// PWD Service (Dao)
export const create = async (payload: PasswordHistoryGetPayload) => {
  const createPayload = {
    username: payload.username,
    hash: payload.hash,
    updatedAt: undefined,
    createdAt: undefined,
    id: undefined,
  };
  return await prisma.passwordHistory.create({ data: createPayload });
};

export const findInLast = async ({
  username,
  lastCount,
}: {
  username: string;
  lastCount: number;
}) => {
  return await prisma.passwordHistory.findMany({
    where: {
      username: username,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: lastCount,
  });
};
```
