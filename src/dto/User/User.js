
export default class UserDTO {

    static getTokenDTOFrom = (user) =>{
        return {
            name: `${user.firstName} ${user.lastName}`,
            id:user._id,
            role: user.role,
            library:user.library
        }
    }
}