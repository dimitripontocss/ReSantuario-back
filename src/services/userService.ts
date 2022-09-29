import bcrypt from "bcrypt";
// import sgMail from "@sendgrid/mail";

import { INewUserData, TUser } from "../interfaces/interfaces";
import * as userRepository from "../repositories/userRepository";
import jwtGenerator from "../utils/jwtGenerator";

export async function signUpService(newUserData: INewUserData) {
  const alreadyExistEmail = await userRepository.findSingleUser(
    newUserData.email
  );
  if (alreadyExistEmail) {
    throw {
      name: "Already used",
      message: "Este email já esta cadastrado, faça seu login.",
    };
  }

  const alreadyExistUsername = await userRepository.findSingleUserByUsername(
    newUserData.userName
  );
  if (alreadyExistUsername) {
    throw {
      name: "Already used",
      message: "Este username já esta cadastrado, faça seu login.",
    };
  }

  const cryptedPassword = bcrypt.hashSync(newUserData.password, 10);

  await userRepository.insertUser({
    userName: newUserData.userName,
    email: newUserData.email,
    password: cryptedPassword,
  });

  return;
}

export async function signInService(userData: TUser) {
  const possibleUser = await userRepository.findSingleUser(userData.email);
  if (!possibleUser) {
    throw {
      name: "auth_error",
      message: "Este email não está cadastrado.",
    };
  }

  const isPasswordCorrect = bcrypt.compareSync(
    userData.password,
    possibleUser.password
  );
  if (!isPasswordCorrect) {
    throw {
      name: "auth_error",
      message: "Ocorreram erros na autenticação tente novamente mais tarde.",
    };
  }

  const token = jwtGenerator(possibleUser.id);

  return { token, userName: possibleUser.userName };
}

export async function findPossibleUserById(userId: number) {
  const user = await userRepository.findUserById(userId);
  if (!user) throw { name: "not_found", message: "User not found" };

  return user;
}

// export async function sendEmails(teacher: string,category: string,name: string,discipline: string) {
//     const SG_API_KEY = process.env.SG_API_KEY;
//     sgMail.setApiKey(SG_API_KEY);
//     try{
//         const emails = await userRepository.getAllUsersEmails();
//         for(const email of emails){
//             const body = {
//                 to: email.email,
//                 from: "assis.dimitri@engenharia.ufjf.br",
//                 subject: "Estudante, uma nova prova foi adicionada!",
//                 text: `A seguinte prova foi adicionada: ${teacher} ${category} - ${name} ${discipline}`
//             }
//             await sgMail.send(body)
//         }
//     }catch(error) {
//         console.log(error.body);
//         throw {
//             name: "error_email",
//             message: "Test created on dataBase, but failed to send email"
//         }
//     }
// }
