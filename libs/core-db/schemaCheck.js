const fs = require('fs');

function checkSchemaNamings() {
  const schemaFile = './prisma/schema.prisma';
  const schemaContent = fs.readFileSync(schemaFile, 'utf-8');
  const blocks = schemaContent.split('\n}');

  const modelNames = [];

  function legalName(name) {
    // Check if the name starts with an uppercase letter
    if (name[0].toUpperCase() !== name[0]) {
      throw new Error(`\nError: "${name}" needs to be in UpperCamelCase format.`);
    }

    // Check if the name ends with an uppercase letter
    if (name[name.length - 1].toUpperCase() === name[name.length - 1]) {
      throw new Error(`\nError: "${name}" needs to be in UpperCamelCase format.`);
    }
    // Check if the name ends with 's' (should be singular)
    if (name[name.length - 1].toLowerCase() === 's') {
      if (
        ![
          'status',
          'address',
          'alias',
          'analysis',
          'axis',
          'basis',
          'bias',
          'bus',
          'campus',
          'canvas',
          'census',
          'class',
          'compass',
          'corpus',
          'crisis',
          'diagnosis',
          'ellipsis',
          'emphasis',
          'focus',
          'genesis',
          'hypothesis',
          'iris',
          'lens',
          'loss',
        ].some((keyword) => name.toLowerCase().includes(keyword))
      ) {
        throw new Error(`\nError: "${name}" should be singular (no 's' at the end).`);
      }
    }
  }

  blocks.forEach((block) => {
    const lines = block.trim().split('\n');
    lines.forEach((line) => {
      const lineWords = line.split(' ');
      if (line.slice(0, 6).includes('model ')) {
        modelNames.push(lineWords[1]);
      }
    });
  });
  blocks.forEach((block) => {
    if (
      block.includes('generator') ||
      block.includes('datasource') ||
      block.includes('provider') ||
      block.includes('output')
    ) {
      return;
    }

    const lines = block.trim().split('\n');
    const firstLineWords = lines[0].split(' ');

    if (lines[0].includes('enum ')) {
      const enumName = firstLineWords[1];
      legalName(enumName);
      const secondHalf = block.trim().split('{')[1];
      // Check if the enum body content is all uppercase
      if (secondHalf.toUpperCase().replace(/\/\/.*/g, '') !== secondHalf.replace(/\/\/.*/g, '')) {
        throw new Error(`\nError: Enum "${enumName}" body content should be all uppercase.`);
      }
    } else if (lines[0].includes('model ')) {
      const modelName = firstLineWords[1];
      legalName(modelName);
      lines.slice(1).forEach((line) => {
        if (line.trim().length === 0) {
          throw new Error(
            `\nError: "${modelName}" has an empty line.Try use // replace the empty line to keep the format consistent across the model body.`,
          );
        }
        if (line.trim()[0] === '/') {
          return;
        }
        const [fieldName, fieldType] = line
          .trim()
          .split(' ')
          .filter((val) => val.length > 0);

        // Check if the field name is in camelCase format
        if (fieldName.includes('_')) {
          throw new Error(`\nError: Field "${fieldName}" in "${modelName}" should be in camelCase format.`);
        }

        // Check if the field name starts with an uppercase letter (except for enums)
        if (fieldName[0].toUpperCase() === fieldName[0] && fieldName[0] !== '/') {
          if (!modelNames.includes(fieldType.replace('[]', '').replace('?', '').trim())) {
            throw new Error(
              `\nError: Field "${fieldName}" in "${modelName}" should not start with an uppercase letter because its not a relation.`,
            );
          }
        }

        // Check relationship fields
        if (modelNames.includes(fieldType.replace('[]', '').replace('?', ''))) {
          // Check if the field name is in UpperCamelCase format
          if (fieldName[0] !== fieldName[0].toUpperCase()) {
            throw new Error(
              `\nError: Field "${fieldName}" in "${modelName}" is a relation mapping; hence it should be in UpperCamelCase format.`,
            );
          }
        }

        // fieldname should end with an s or not
        if (
          ![
            'status',
            'address',
            'alias',
            'analysis',
            'axis',
            'basis',
            'bias',
            'bus',
            'campus',
            'canvas',
            'census',
            'class',
            'compass',
            'corpus',
            'crisis',
            'diagnosis',
            'ellipsis',
            'emphasis',
            'focus',
            'genesis',
            'hypothesis',
            'iris',
            'lens',
            'loss',
            'thumbnailphoto',
          ].some((keyword) => fieldName.toLowerCase().includes(keyword))
        ) {
          if (fieldName[fieldName.length - 1].toLowerCase() === 's' && !fieldType.includes('[]')) {
            throw new Error(
              `\nError: Field "${fieldName}" in "${modelName}" is not a list; hence it should not end with an 's'.`,
            );
          } else if (fieldType.includes('[]') && fieldName[fieldName.length - 1].toLowerCase() !== 's') {
            throw new Error(
              `\nError: Field "${fieldName}" in "${modelName}" is a list; hence it should end with an 's'.`,
            );
          }
        }
      });

      // Check if createdAt and updatedAt fields exist

      if (!/\n\s+createdAt\s+DateTime\s+@default\(now\(\)\)/.test(block)) {
        throw new Error(
          `\nError: "${modelName}" is missing the "createdAt" field. Add this 'createdAt DateTime @default(now())' to "${modelName}"`,
        );
      }

      if (!/\n\s+updatedAt\s+DateTime\s+@updatedAt/.test(block)) {
        throw new Error(
          `\nError: "${modelName}" is missing the "updatedAt" field. Add this 'updatedAt DateTime @updatedAt' to "${modelName}"  `,
        );
      }
    }
  });
}

checkSchemaNamings();
