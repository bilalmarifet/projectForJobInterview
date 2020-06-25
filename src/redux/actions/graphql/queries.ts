import gql from 'graphql-tag';

export const getPastOrders = gql`
  query getPastOrders($index: Int!, $limit: Int!) {
    pastOrders(index: $index, limit: $limit) {
      address {
        addressLine1
        addressLine2

        flatNumber
        fullName
        geoEnabled
        id
        lat
        lon
        postalCode
        tips
        title
        userAddressId
      }

      deliveryFee
      deliveryTime
      deliveryType
      earnedPoints
      items {
        amount
        description
        id
        name
        note
        oldAmount

        quantity
        totalAmount
      }
      orderCheckDeadline
      orderCompletedRewardPoints
      orderDate
      orderDeclineReason
      orderDeliveryDeadline
      orderEarliestDeliveryDeadline
      orderEarliestPreparingDeadline
      orderLatestDeliveryDeadline
      orderLatestPreparingDeadline
      orderPreparingDeadline
      orderPreparingDelay
      preOrder
      preparationTime
      refund {
        amount
      }
      promoCode {
        afterGainAmount
        beforeGainAmount
        code
        createdAt
        expiryAt
        gainAmount
        gainStage
        gainType
        id
        minOrderAmount
        restaurantName
        restaurantUID

        title
        type
        useAble
        useAbleForRestaurant
        usedAt
      }

      restaurant {
        name
      }
      restaurantDeliveryType

      smallAmountFee
      status
      subTotal

      total
      totalPromoCodeAmount
      uid
      usedPoints
      userCanCall
      userCanRate
      userCanReOrder
      userCanTip
    }
  }
`;

export const getRestaurants = gql`
  query getRestaurants(
    $index: Int!
    $showOffline: Boolean!
    $limit: Int!
    $delivery: Boolean!
  ) {
    restaurants(
      index: $index
      showOffline: $showOffline
      limit: $limit
      delivery: $delivery
    ) {
      avgScore
      deal {
        delivery
        id
        int
        min_spend_amount
        reward_percent
        time_frame_id
      }
      delivery
      deliveryFee {
        amount
        freeDeliveryMoreThanAmount
        freeDeliveryMoreThanEnabled
      }
      deliveryReOpenDate
      deliveryType
      distance
      freebie {
        id
        itemCount
        minSpendAmount
        tagName
      }
      inDistance
      isNew
      minOrderAmount
      minOrderEnabled
      name
      open
      picture {
        alt
        bundle
        height
        id
        title
        url
        width
      }
      reOpenDate
      restaurantAddressPostalCode
      restaurantAddressSlugAdminWard
      restaurantAddressSlugCityName
      restaurantCollectionWorkingTimeStatus
      restaurantDeliveryDriverStatus
      restaurantDeliveryStatus
      restaurantDeliveryWorkingTimeStatus
      restaurantItemId
      restaurantNextVacationEndDate
      restaurantNextVacationStartDate
      restaurantNextVacationStatus
      restaurantOpenStatus
      restaurantStatusCode
      restaurantStatusParams
      restaurantWorkingHourOpenTime
      slugName
      types {
        id
        name
      }
      uid
    }
  }
`;

export const getUserInfoQuery = gql`
  query getUserInfoQuery {
    user {
      addresses {
        addressIconId
        addressLine1
        addressLine2
        adminWard
        city {
          id
          name
          slugName
          timezone
        }
        country {
          id
          isoCode
          name
          slugName
        }
        default
        flatNumber
        fullName
        geoEnabled
        id
        lat
        lon
        postalCode
        slugAdminWard
        tips
        title
      }
      bucketPoints {
        bucketId
        points
      }
      createdAt
      creditCards {
        createdAt
        default
        expMonth
        expYear
        holderName
        last4
        method
        uid
      }
      email
      emailVerified
      firebaseUserUid
      firstName
      lastName
      mobileNumber
      notificationSettings {
        orderUpdates
        promotionAppNotification
        promotionEmail
        promotionTextMessage
      }
      points
      pointsExpires {
        expiresAt
        points
      }
      profilePicture {
        alt
        bundle
        height
        id
        title
        url
        width
      }
      ref {
        destinationGainAmount
        refCode
        serviceStatus
        sourceGainAmount
      }
      smsVerified
      uid
      userGroup {
        id
        name
      }
    }
  }
`;
