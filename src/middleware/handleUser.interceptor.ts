import * as userService from "./../services/user.service";

export const checkDuplicateUsernameEmail = (request, response, next) => {
  const { username, email }  = request.body
  userService.checkDuplicateUsernameEmail(username, email)
  .then(() => {
    next()
  }).catch((err) => {
    response.status(err.code).json(err)
  });
}