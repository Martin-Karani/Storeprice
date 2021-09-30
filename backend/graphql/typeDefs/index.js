const { gql } = require("apollo-server");

module.exports = gql`
  type Member {
    _id: ID!
    email: String!
    userName: String!
    likes: [ID]
    isStore: Boolean!
    storeId: ID
    isAdmin: Boolean
    password: String
    token: String!
  }
  input MemberInput {
    userName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type OnlineCard {
    _id: String!
    onlineSite: String!
    storeName: String!
    category: String!
    productId: ID!
    logo: String!
    price: Float!
    url: String!
    tags: [String]!
    updatedAt: String
  }

  input OnlinePriceInput {
    _id: String!
    onlineSite: String!
    storeName: String!
    productId: ID!
    category: String!
    logo: String!
    price: Float!
    url: String!
    tags: [String]!
  }

  type InStoreCard {
    _id: String!
    store: Store
    productId: ID!
    category: String!
    storeId: ID!
    price: Float!
    rating: Int
    updatedAt: String
  }
  type Review {
    reviewId: String!
    rating: Int!
    review: String!
    creator: ID!
    createdAt: String!
  }
  type QuickFeature {
    positive: Boolean!
    feature: String!
  }
  type Specs {
    ram: String
    storage: String
  }
  type PriceHistory {
    onlineSite: String
    storeName: String!
    storeId: String!
    price: Float!
    date: String!
  }
  type Answer {
    answerId: String!
    creator: ID!
    answer: String!
  }
  type Question {
    questionId: String!
    creator: Member!
    question: String!
    answer: [Answer]!
    createdAt: String!
  }
  type ExpertReview {
    site: String!
    review: String!
    createdAt: String!
    url: String!
  }

  type Product {
    _id: ID!
    name: String!
    brand: String
    lowestPrice: Float
    highestPrice: Float
    category: String!
    coverImg: String!
    preDescription: String
    subCategory: [String]
    tags: [String]
    quickFeatures: [QuickFeature]
    images: [String]
    color: [String]
    description: String
    specs: Specs
    variants: [String]
    pricehistory: [PriceHistory]
    onlinePrices: [OnlineCard]
    inStorePrices: [InStoreCard]
    rating: Int
    creator: String
    likeCount: Int
    likes: [ID!]
    createdAt: String
    reviews: [Review]
    expertReviews: [ExpertReview]
    questions: [Question]
    similar: [Product]
  }
  input SpecsInput {
    ram: String
  }
  input QuickFeatureInput {
    feature: String
    positive: Boolean
  }
  input ProductInput {
    name: String!
    category: String!
    preDescription: String
    coverImg: String!
    brand: String
    subCategory: [String]
    tags: [String!]
    quickFeatures: [QuickFeatureInput]
    images: [String!]
    color: [String!]
    description: String
    specs: SpecsInput
    variants: [String]
    similar: [ID]
  }
  type Store {
    _id: ID!
    storeName: String
    Town: String
    location: String
    phoneNo: Int
    products: [Product]
    categories: [String]
    coverImg: String
    storeImg: [String]
    instagram: String
    facebook: String
    twitter: String
    whatsapp: String
    reviews: [Review]
  }

  input UpdateOnlinePriceInput {
    productId: ID!
    onlinePriceId: String!
    price: Float!
    url: String
  }
  input StoreInput {
    phoneNo: Int!
    town: String!
    location: String!
    storeName: String
    products: [ID!]
    coverImg: String
    storeImg: [String]
    instagram: String
    facebook: String
    twitter: String
    whatsapp: String
  }
  # union storeDetails = Store | StoreProfile
  type Query {
    search(searchInput: String!): [Product]!
    getUser: Member!
    getProducts(category: String!): [Product!]
    getProduct(category: String!, productName: String!): Product!
    getStores: [Store!]
    getSelectedProducts(productIds: [ID!]!): [Product!]

    getStore(storeId: ID!): Store!
    compareProducts(productIds: [ID!]): [Product!]
  }

  type Mutation {
    # product mutation
    createProduct(productInput: ProductInput!): String!
    deleteProduct(productId: ID!, category: String!): String!
    updateProduct(productId: ID, fields: ProductInput): String!
    likeProduct(productId: ID!): String

    # store mutation
    createStore(
      memberInput: MemberInput
      town: String!
      location: String!
      phoneNo: Int!
    ): Member!
    editStore(storeInput: StoreInput): String!
    deleteStore(memberId: ID!): String

    # onlinePrice mutation
    addOnlinePrice(onlinePriceInput: OnlinePriceInput): String!
    updateOnlinePrice(updateOnlinePriceInput: UpdateOnlinePriceInput): String!
    deleteOnlinePrice(
      productId: ID!
      category: String!
      onlinePriceId: ID!
    ): String!

    # inStorePrice mutation
    addInStorePrice(productId: ID!, price: Float!, category: String!): String!
    updateInStorePrice(productId: ID!, price: Float, category: String!): String!
    deleteInStorePrice(productId: ID!, category: String!): String!

    # Member mutation
    login(email: String!, password: String!): Member!
    createMember(memberInput: MemberInput): Member!

    addReview(productId: ID!, review: String!, rating: Int!): String!
    addStoreReview(storeId: ID!, review: String!, rating: Int!): String!
    askQuestion(productId: ID!, question: String!): String!
    addExpertReview(
      productId: ID!
      review: String!
      createdAt: String!
      url: String!
      site: String!
    ): String!
    answerQuestion(
      productId: String!
      questionId: String!
      answer: String!
    ): String!
  }
`;
