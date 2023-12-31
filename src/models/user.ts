export interface UserResponse {
  statusCode: number;
  message: string;
  data: User;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string[];
  image: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  firstname: string;
  lastname: string;
  phone: string;
}

export interface PasswordForm {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}
