import {
  Keyboard,
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { signOut, onAuthStateChanged } from "firebase/auth";


const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const user = auth.currentUser;
        setUserData(user);
      }
    });
  }, []);
  
  useEffect(() => {
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPosts(postsList);
        return postsList;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  
    getDataFromFirestore();
  }, []);

  const addImage = (event) => {
    event.preventDefault();
  };

  const logOut = async () => {
    await signOut(auth);
    setUserData([])
    navigation.navigate("Login");
  };

  const handleLikes = async (postId, postIndex) => {
    try {
      const updatedPosts = [...posts];
      const currentLikes = updatedPosts[postIndex].data.likes;
      const updatedLikes = currentLikes + 1;

      const docRef = doc(collection(db, "posts"), postId);
      await updateDoc(docRef, {
        likes: updatedLikes,
      });

      updatedPosts[postIndex].data.likes = updatedLikes;
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/bg-img.jpg")}
          style={styles.imageBackground}
          imageStyle={{
            minHeight: 812,
          }}
        >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.profileContainer}
        >
          <View>
            <TouchableOpacity
              style={styles.buttonLogOut}
              onPress={logOut}
            >
              <Image
                style={styles.iconLogOut}
                source={require("../images/log-out.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={require("../images/avatar.jpg")}
            />
            <TouchableOpacity style={styles.buttonAdd} onPress={addImage}>
              <Image
                style={styles.buttonAddIcon}
                source={require("../images/added.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.nameTitle}>
              {userData.displayName && userData.displayName}
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {posts && (
            <View style={styles.posts}>
            {posts.map((postItem, index) => (
              <View key={postItem.id} style={styles.post}>
                <TouchableOpacity
                  style={styles.postImageLink}
                  onPress={() => navigation.navigate(
                    "Comments", {postId: postItem.id, }
                  )}
                >
                  <Image
                    style={styles.postImage}
                    source={{ uri: postItem.data.photo }}
                  />
                </TouchableOpacity>
                  <View style={styles.postContent}>
                    <Text style={styles.postTitle}>
                      {postItem.data.title}  
                    </Text>
                    <View style={styles.postMeta}>
                      <TouchableOpacity style={styles.postComments} onPress={() =>
                              navigation.navigate("Comments", {
                                postId: postItem.id,
                              })}>
                        <Image
                          style={styles.postIcon}
                          source={postItem.data.comments.length !== 0
                            ? require("../images/comments.png")
                            : require("../images/comments-o.png")}
                        />
                        <Text style={styles.postCount}>
                          {postItem.data.comments.length}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => handleLikes(postItem.id, index)}
                      style={styles.postLikes}>
                        <Image
                          style={styles.postIcon}
                          source={require("../images/like.png")}
                        />
                        <Text style={styles.postCount}>
                          {postItem.data.likes}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.postLocationInfo}>
                        <Image
                          style={styles.postIcon}
                          source={require("../images/map.png")}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Map", {postId: postItem.id,})
                          }
                        >
                        <Text style={styles.postLocationAddress}>
                          {postItem.data.locationText}
                        </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
              </View>
              ))}      
                </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
  
export default ProfileScreen;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    position: "relative",
  },
  profileContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    top: 147,
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonLogOut: {
    position: "absolute",
    top: 22,
    right: 16,
    width: 24,
    height: 24,
  },
  iconLogOut: {
    width: 24,
    height: 24,
  },
  avatar: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginBottom: 32,
    width: 120,
    aspectRatio: 1,
    marginTop: -76,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonAdd: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -14,
    bottom: 14,
  },
  buttonAddIcon: {
    width: 25,
    height: 25,
  },
  avatarImage: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  titleContainer: {
    marginBottom: 33,
  },
  nameTitle: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  posts: {
    flex: 1,
    position: "relative",
  },
  post: {
    marginBottom: 32,
  },
  postImageLink: {
    marginBottom: 8,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    width: "100%",
  },
  postTitle: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: "row",
    gap: 24,
  },
  postIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  postCount: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
  },
  postComments: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  postLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationInfo: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationAddress: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
