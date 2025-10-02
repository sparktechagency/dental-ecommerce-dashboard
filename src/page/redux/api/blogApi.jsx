import { baseApi } from "./baseApi";

const blog = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getBlog: builder.query({
      query: () => {
        return {
          url: `/blogs`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),



    addBlog: builder.mutation({
      query: (data) => {
        return {
          url: "/blogs",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),



    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),



    updateBlog: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/blogs/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),




  
  }),
});

export const {
 
  useAddBlogMutation,useDeleteBlogMutation,useGetBlogQuery,useUpdateBlogMutation,

} = blog;













