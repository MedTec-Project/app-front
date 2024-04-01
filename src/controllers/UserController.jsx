import { userLogin } from "../routes/UserRoutes";

export default async function UserController(param){
    await userLogin()
}