import { updatePost } from "../redux/features/postsSlice";

export function getUserName(users, userId) {
  for (let user of users) {
    if (user["id"] === userId) {
      return user["name"];
    }
  }
  return "Invalid User";
}
