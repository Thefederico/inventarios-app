const createObjectPayload = (payload) => {
  const objPayload = {};
  const payloadKeys = Object.keys(payload)
  payloadKeys.forEach((field)=>{
    objPayload[field]=payload[field]
  })

  return objPayload
}

export default function appReducer(state, action) {
    switch (action.type) {
      case "SET_GLOBAL_STATE":
        return {
          ...state,
          ...createObjectPayload(action.payload)
        }
      case "UPDATE_GLOBAL_STATE":
        return {
          ...state,
          ...action.payload
        }
      case "RESET_GLOBAL_STATE":
        return {
          ...state,
          ...action.payload
        }
      case "INPUT_CHANGE":
        return {
          ...state,
          ...createObjectPayload(action.payload)
        }
      case "USER_REGISTER":
        return {
          ...state,
          ...createObjectPayload(action.payload)
        }
      case "USER_LOGIN":
        return {
          ...state,
          ...createObjectPayload(action.payload)
        }
      default:
        return state;
    }
  }