import { useState, useEffect } from "react";
import axios from "axios";

interface UserProfileInterface {
  username: string;
  email: string;
  followers: number;
  following: number;
  description: string;
  interests: string[];
}

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileInterface>();
  const [description, setDescription] = useState<string>(
    userProfile?.description || ""
  );
  const [interests, setInterests] = useState<string>(
    userProfile?.interests.join(", ") || ""
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .patch(
        "http://localhost:3000/api/updateprofile",
        {
          description,
          interests: interests.split(",").map((i) => i.trim()),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Profile update successful:", response.data);
        setDescription(response.data.updatedUser.description)
        setInterests(response.data.updatedUser.interests.join(", "))
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });

    handleEditToggle();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user!);

    axios
      .get(`http://localhost:3000/api/self/${userData.id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data.user;

        console.log(data)

        setUserProfile({
          username: data.username,
          email: data.email,
          followers: data.followers,
          following: data.following,
          description: data.description,
          interests: data.interests,
        });

        setDescription(data.description)
        setInterests(data.interests.join(", "))
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setDescription(userProfile?.description || "")
    setInterests(userProfile?.interests.join(", ") || "")
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <img
            src="your_profile_picture.jpg"
            className="founder-image rounded-full shadow-lg mb-6"
          />
          <div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{userProfile?.followers}</h2>
                <h3 className="text-gray-500">Followers</h3>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{userProfile?.following}</h2>
                <h3 className="text-gray-500">Following</h3>
              </div>
            </div>
            <div className="mb-4 items-center">
              <h2 className="text-2xl font-bold">{userProfile?.username}</h2>
              <h2 className="text-lg text-gray-500">{userProfile?.email}</h2>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <h1 className="text-3xl font-bold mb-4">User Info</h1>
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">About Me</h2>
              {editMode ? (
                <input
                  type="text"
                  id="description"
                  className="w-full bg-gray-100 p-2 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <div
                  className="w-full bg-gray-100 p-2 rounded"
                  style={{ minHeight: "3rem" }}
                >
                  {description}
                </div>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Interests</h2>
              {editMode ? (
                <input
                  type="text"
                  id="interests"
                  className="w-full bg-gray-100 p-2 rounded"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              ) : (
                <div
                  className="w-full bg-gray-100 p-2 rounded"
                  style={{ minHeight: "3rem" }}
                >
                  {interests}
                </div>
              )}
            </div>
          </div>
          {editMode ? (
            <>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleProfileUpdate}
              >
                Save
              </button>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleEditToggle}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
