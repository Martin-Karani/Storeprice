import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts($category: String!) {
    getProducts(category: $category) {
      _id
      images
      lowestPrice
      name
      tags
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      email
      userName
      likes
      isStore
      storeId
      isAdmin
      password
    }
  }
`;
export const GET_STORE = gql`
  query getStore($storeId: ID!) {
    getStore(storeId: $storeId) {
      _id
      storeName
      facebook
      instagram
      twitter
      phoneNo
      whatsapp
      products {
        _id
        images
        lowestPrice
        name
        tags
      }
      storeImg
      coverImg
      location
    }
  }
`;
export const GET_PRODUCT = gql`
  query getProduct($category: String!, $productName: String!) {
    getProduct(category: $category, productName: $productName) {
      _id
      name
      quickFeatures {
        feature
        positive
      }
      reviews {
        reviewId
        rating
        review
        creator
        createdAt
      }
      lowestPrice
      highestPrice
      tags
      onlinePrices {
        _id
        onlineSite
        storeName
        price
        updatedAt
      }
      inStorePrices {
        _id
        storeId
        store {
          storeName
          location
        }
        price
        rating
        productId
      }
      questions {
        questionId
        creator {
          userName
        }
        answer {
          answerId
          creator
          answer
        }
        question
      }
      expertReviews {
        site
        review
        createdAt
      }
    }
  }
`;
export const GET_SELECTED_PRODUCTS = gql`
  query getSelectedProducts($productIds: [ID!]!) {
    getSelectedProducts(productIds: $productIds) {
      _id
      name
      lowestPrice
      highestPrice
      tags
    }
  }
`;
