import { env } from "./env";
import { FileType } from "./Types/FileType";
import { LikeArray } from "./Types/LikeType";

import {
  Loginschemtype,
  Registerschemtype,
  UpdateProfileSchemaType,
} from "./zodschema";
import ky, { HTTPError } from "ky";
import { toast } from "sonner";
import { UserType } from "./Types/UserType";
import { PostType } from "./Types/PostType";

export const registerUser = async (registerData: Registerschemtype) => {
  try {
    const registerUsers = await ky.post("register", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/users`,
      mode: "cors",
      json: {
        first_name: registerData.first_name,
        email: registerData.email,
        password: registerData.password,
      },
    });

    if (registerUsers.ok) {
      toast.success("Registration Succesfully");
    }
  } catch (error: any) {
    console.log(error);

    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>();
      console.log(errorJson);
      toast.error(errorJson.errors[0].message);
    } else {
      console.log("nothing");
      toast.error("Network Error");
    }
  }
};
export const checkEmail = async (email: string) => {
  try {
    const isRegistered = await ky
      .get("users", {
        prefixUrl: `${env.NEXT_PUBLIC_API}`,
        credentials: "include",
        mode: "cors",
        searchParams: new URLSearchParams({
          filter: JSON.stringify({
            email: {
              _eq: email,
            },
          }),
        }),
      })
      .json<any>();

    console.log(isRegistered);

    if (isRegistered.data.length != 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (loginData: Loginschemtype) => {
  try {
    const res = await ky.post("login", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/auth`,
      credentials: "include",
      mode: "cors",
      json: {
        email: loginData.email,
        password: loginData.password,
        mode: "session",
      },
    });

    console.log(res);

    if (res.ok === true) {
      toast.success("Login Success!");
      return true;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>();
      console.log(errorJson);
      // toast.error(errorJson.errors[0].message);
      toast.error("Username Or Password may be Incorrect");
    } else {
      toast.error("Network Error");
    }
  }
};

export const logoutUser = async () => {
  try {
    const res = await ky.post("logout", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/auth`,
      credentials: "include",
      mode: "cors",
      json: {
        mode: "session",
      },
    });

    if (res.ok) {
      toast.success("Logout Success!");
      return true;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>();
      toast.error(errorJson.errors[0].message);
    } else {
      toast.error("Network Error");
    }
  }
};

// user upload Post Code

export const uploadPost = async (info: { caption: string }, files: File[]) => {
  try {
    const formData = new FormData();
    formData.append("file", files[0]);

    const postImage = await ky
      .post("files", {
        prefixUrl: `${env.NEXT_PUBLIC_API}`,
        credentials: "include",
        mode: "cors",
        body: formData,
      })
      .json<FileType>();

    console.log(postImage.data.id);

    await ky.post("posts", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
      credentials: "include",
      mode: "cors",
      json: {
        caption: info.caption,
        post_img: postImage.data.id,
      },
    });
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

// Get CurrentUser Auth

export const getCurrentUser = async () => {
  try {
    const result = await ky.get("me", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/users`,
      credentials: "include",
      mode: "cors",
    });

    // console.log(result);

    if (result.ok === true) {
      return result;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

// All user get Post

export const getPosts = async () => {
  try {
    const result = await ky.get("posts", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
      credentials: "include",
      mode: "cors",
      searchParams: new URLSearchParams({
        fields: "*.*",
      }),
    });

    if (result.ok) {
      return result;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

// Update Profile Image Section

export const updateProfileImage = async (files: File[]) => {
  try {
    const formData = new FormData();
    formData.append("file", files[0]);

    const editProfile = await ky
      .post("files", {
        prefixUrl: `${env.NEXT_PUBLIC_API}`,
        credentials: "include",
        mode: "cors",
        body: formData,
      })
      .json<FileType>();

    if (editProfile === null || undefined) {
      // console.log(editProfile);
      toast.error("Something Wrong");
    }

    console.log(editProfile.data.title);

    const result = await ky.patch("me", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/users`,
      credentials: "include",
      mode: "cors",
      json: {
        avatar: editProfile.data.id,
      },
    });

    if (result.ok === true) {
      return result;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const updateProfileDetails = async (
  userData: UpdateProfileSchemaType
) => {
  try {
    const res = await ky.patch("me", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/users`,
      credentials: "include",
      mode: "cors",
      json: {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        description: userData.description,
      },
    });

    if (res.ok == true) {
      return res;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const getCurrentUserPosts = async () => {
  try {
    const filter = {
      user_created: {
        _eq: "$CURRENT_USER",
      },
    };

    const result = await ky.get("posts", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
      credentials: "include",
      mode: "cors",
      searchParams: new URLSearchParams({
        fields: "*.*",
        filter: JSON.stringify(filter),
      }),
    });

    if (result.ok === true) {
      return result;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const deletePost = async (id: string) => {
  try {
    const deletePost = await ky.delete(`posts/${id}`, {
      prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
      credentials: "include",
      mode: "cors",
    });
    // console.log(deletePost);
    if (deletePost.ok == true) {
      return deletePost;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const postLike = async (postid: string) => {
  try {
    const LikePost = await ky.post("likes", {
      prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
      credentials: "include",
      mode: "cors",
      json: {
        post_id: postid,
      },
    });

    if (LikePost.ok) {
      console.log(LikePost);
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const deleteLikesByPostID = async (postid: string) => {
  try {
    const filter = {
      post_id: {
        _eq: postid,
      },

      user_created: {
        _eq: "$CURRENT_USER",
      },
    };
    if (filter === undefined || null) toast.error("Likes error");
    if (filter !== undefined || null) {
      const res = await ky.get("likes", {
        prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
        credentials: "include",
        mode: "cors",
        searchParams: new URLSearchParams({
          filter: JSON.stringify(filter),
        }),
      });

      const data = (await res.json<LikeArray>()).data[0];

      await ky.delete(data.id, {
        prefixUrl: `${env.NEXT_PUBLIC_API}/items/likes`,
        credentials: "include",
        mode: "cors",
      });
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const getLikesByPostID = async (postid: string) => {
  try {
    const filter = {
      post_id: {
        _eq: postid,
      },
      user_created: {
        _eq: "$CURRENT_USER",
      },
    };

    if (filter === undefined || null) toast.error("Likes error");
    // console.log(filter);

    if (filter !== undefined || null) {
      const res = await ky.get("likes", {
        prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
        credentials: "include",
        mode: "cors",
        searchParams: new URLSearchParams({
          filter: JSON.stringify(filter),
        }),
      });
      if (res.ok) {
        return res.json<LikeArray>();
      }
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const publicProfile = async (id: string) => {
  try {
    const request = await ky
      .get(`users/${id}`, {
        prefixUrl: `${env.NEXT_PUBLIC_API}`,
        credentials: "include",
        mode: "cors",
      })
      .json<UserType>();
    if (request !== undefined) {
      return request;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};

export const publicUserPosts = async (id: string) => {
  try {
    const filter = {
      user_created: {
        _eq: id,
      },
    };

    const request = await ky
      .get("posts", {
        prefixUrl: `${env.NEXT_PUBLIC_API}/items`,
        credentials: "include",
        mode: "cors",
        searchParams: new URLSearchParams({
          fields: "*.*",
          filter: JSON.stringify(filter),
        }),
      })
      .json<PostType>();

    if (request !== undefined) {
      return request;
    }
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      await httpError.response.json<any>();
      toast.error("Our Backend Services Down");
    } else {
      toast.error("Plz Checking your Network Connection");
    }
  }
};
