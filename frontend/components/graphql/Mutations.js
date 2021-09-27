import { gql } from "@apollo/client";

export const CREATE_MEMBER = gql`
  mutation createMember(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createMember(
      memberInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      email
      isStore
      token
      storeId
    }
  }
`;

export const CREATE_STORE = gql`
  mutation createStore(
    $location: String!
    $userName: String!
    $town: String!
    $email: String!
    $phoneNo: Int!
    $password: String!
    $confirmPassword: String!
  ) {
    createStore(
      memberInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
      phoneNo: $phoneNo
      town: $town
      location: $location
    ) {
      _id
      token
      userName
      isStore
      storeId
      email
    }
  }
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      isStore
      userName
      isAdmin
      token
      storeId
    }
  }
`;

export const ADD_STORE_REVIEW = gql`
  mutation addStoreReview($storeId: ID!, $review: String!, $rating: Int!) {
    addStoreReview(storeId: $storeId, review: $review, rating: $rating)
  }
`;
export const ASK_QUESTION = gql`
  mutation askQuestion($productId: ID!, $question: String!) {
    askQuestion(productId: $productId, question: $question)
  }
`;
export const EDIT_STORE = gql`
  mutation editStore(
    $coverImg: String
    $storeImg: [String]
    $storeName: String!
    $town: String!
    $location: String!
    $phoneNo: Int!
    $twitterUrl: String
    $instagramUrl: String
    $facebookUrl: String
    $whatsappNo: String
  ) {
    editStore(
      storeInput: {
        coverImg: $coverImg
        storeImg: $storeImg
        storeName: $storeName
        location: $location
        phoneNo: $phoneNo
        town: $town
        twitter: $twitterUrl
        instagram: $instagramUrl
        facebook: $facebookUrl
        whatsapp: $whatsappNo
      }
    )
  }
`;
