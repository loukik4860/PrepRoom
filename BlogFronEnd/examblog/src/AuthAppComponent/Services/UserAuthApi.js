import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/blog/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query : (user) => {
            return{
                url : 'register/',
                method : "POST",
                body : user,
                headers : {
                    'Content-type' : 'application/json',
                }
            }
        }
    }),
    loginUser: builder.mutation({
      query : (user) => {
          return{
              url : 'login/',
              method : "POST",
              body : user,
              headers : {
                  'Content-type' : 'application/json',
              }
          }
      }
  }),
  getLoggedUser : builder.query({
    query : (access_token) => {
        return {
            url : 'profile/',
            method : "GET",
            headers : {
                'authorization' : `Bearer ${access_token}`,
            }
        }
    }
    }),
    changeUserPassword : builder.mutation({
        query:({actualData,access_token})=>{
            return{
                url : 'changePassword/',
                method : "POST",
                body : actualData,
                headers : {
                    'authorization' : `Bearer ${access_token}`,
                }
            }
        }
    }),
    sendPasswordResetEmail : builder.mutation({
        query : (user) =>{
            return{
                url : 'password_reset_email/',
                method : 'POST',
                body : user,
                header : {
                    'Content-type' : 'application/json',
                }
            }
        }
    }),
    resetPassword : builder.mutation({
        query:({actualData,id,token})=>{
            return{
                url :`password_reset/${id}/${token}/`,
                method : "POST",
                body : actualData,
                header : {
                    'Content-type' : 'application/json',
                }
            }
        }
    })
  }),

})
export const { useRegisterUserMutation,useLoginUserMutation, useGetLoggedUserQuery, 
               useChangeUserPasswordMutation,useSendPasswordResetEmailMutation,useResetPasswordMutation } = userAuthApi