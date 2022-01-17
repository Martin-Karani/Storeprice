module.exports = {
  client: {
    includes: ["./src/client.schema1.ts"],
    service: {
      localSchemaFile: "./node_modules/@mycompany/gql-schema/schema.graphql",
    },
  },
};
