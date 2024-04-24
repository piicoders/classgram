export const standard = defineScenario({
  comment: {
    one: {
      data: {
        content: 'String',
        user: {
          create: {
            email: 'String8962917',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
            roles: 'P',
          },
        },
        document: { create: { content: 'String' } },
      },
    },
    two: {
      data: {
        content: 'String',
        user: {
          create: {
            email: 'String2220003',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
            roles: 'P',
          },
        },
        document: { create: { content: 'String' } },
      },
    },
  },
})
