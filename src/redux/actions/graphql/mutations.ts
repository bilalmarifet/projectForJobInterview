import gql from 'graphql-tag';

const createAdMutation = gql`
  mutation(
    $title: String!
    $description: String!
    $image: String!
    $address: String!
    $latitude: Float!
    $longitude: Float!
    $userId: ID!
  ) {
    createAd(
      title: $title
      description: $description
      image: $image
      address: $address
      latitude: $latitude
      longitude: $longitude
      userId: $userId
    ) {
      id
      title
      description
      image
      address
      latitude
      longitude
    }
  }
`;

export const loginWithEmail = gql`
  mutation loginWithEmail($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password, googleCaptchaToken: "") {
      token
    }
  }
`;
