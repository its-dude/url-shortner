import { UserRepository} from "../repositories"

const getUserProfile = (id: number) => {
     return UserRepository.findUserById(id);
}

const deleteUser = (id: number) => {
    return UserRepository.deleteUserById(id)
}
export {getUserProfile, deleteUser}