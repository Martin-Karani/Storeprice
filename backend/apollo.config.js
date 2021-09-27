module.exports = {
  client: {
    includes: ["./src/client.schema.ts"],
    service: {
      localSchemaFile: "./node_modules/@mycompany/gql-schema/schema.graphql",
    },
  },
};
