// const result = await fromPromise(
//     prismaReadService.user.update({
//       where: args?.where,
//       data: args?.data,
//       select: {
//         id: fields?.mainFields?.includes('id' as keyof User),
//         externalOid: fields?.mainFields?.includes('externalOid' as keyof User),
//         loginEmail: fields?.mainFields?.includes('loginEmail' as keyof User),
//         firstName: fields?.mainFields?.includes('firstName' as keyof User),
//         lastName: fields?.mainFields?.includes('lastName' as keyof User),
//         isSuperAdmin: fields?.mainFields?.includes('isSuperAdmin' as keyof User),
//         // roles
//         avatarUrl: fields?.mainFields?.includes('avatarUrl' as keyof User),
//         // thumbnailPhoto
//         timeZoneOffSet: fields?.mainFields?.includes('timeZoneOffSet' as keyof User),
//         timeZone: fields?.mainFields?.includes('timeZone' as keyof User),
//         notificationFrequency: fields?.mainFields?.includes('notificationFrequency' as keyof User),
//         createdAt: fields?.mainFields?.includes('createdAt' as keyof User),
//         updatedAt: fields?.mainFields?.includes('updatedAt' as keyof User),
//         // SignInLogs
//         // UserActivityLogs
//         // UserNotifications
//         // MemberOfBusinessUnits
//       },
//     }),
//     (e) => e,
//   );
