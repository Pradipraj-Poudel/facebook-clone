import * as React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Home from './screens/Home'
import 'react-native-gesture-handler';
import Comments from './screens/Comments'
import CommentsPopUp from './screens/CommentsPopUp'
import PostDetail from './screens/PostDetail'
import SharePost from './screens/SharePost'
import PostOptions from './screens/PostOptions'
import { navigationRef } from './rootNavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios'

import NotificationScreen from './screens/NotificationTab'
import NotificationOptions from './screens/NotificationTab/NotificationOptions'

import PhotoChooser from './screens/PhotoChooser'
import Camera from './screens/CameraTool'

import Page from './screens/Pages'
import PagePostDetail from './screens/Pages/PagePostDetail'

import WatchScreen from './screens/WatchTab'
import WatchDetailList from './screens/WatchTab/WatchDetailList'
import WatchOptions from './screens/WatchTab/WatchOptions'
import WatchSearch from './screens/Search/WatchSearch'
import WatchDetail from './screens/WatchTab/WatchDetail';

import ShortCutScreen from './screens/ShortCutTab'
import Marketplace from './screens/ShortCutTab/Marketplace'
import MarketplaceArea from './screens/ShortCutTab/MarketplaceArea'
import MarketplaceProductDetail from './screens/ShortCutTab/MarketplaceProductDetail'
import MarketplaceCategory from './screens/ShortCutTab/MarketplaceCategory'
import MarketplaceSearch from './screens/Search/MarketplaceSearch'

import ProfileScreen from './screens/ProfileTab'
import ProfileX from './screens/ProfileTab/ProfileX'
import ProfileSetting from './screens/ProfileTab/ProfileSetting'
import ProfilePostOptions from './screens/ProfileTab/ProfilePostOptions'
import EditPublicInfo from './screens/ProfileTab/EditPublicInfo'
import FullFriends from './screens/ProfileTab/FullFriends'
import FriendOptions from './screens/ProfileTab/FriendOptions'
import AvatarOptions from './screens/ProfileTab/AvatarOptions'
import FindFriends from './screens/ProfileTab/FindFriends'
import FriendRequests from './screens/ProfileTab/FriendRequests'

import StoryDetailScreen from './screens/StoryDetail'
import Search from './screens/Search/'
import Result from './screens/Search/Result'

import GroupSearch from './screens/Search/GroupSearch'
import GroupCategory from './screens/GroupTab/GroupCategory'
import GroupCategories from './screens/GroupTab/GroupCategories'
import GroupProfile from './screens/GroupTab/Group'
import GroupScreen from './screens/GroupTab'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();
import { FullPostTool, CheckIn, PhotoUploader, LiveStream } from './screens/PostTools/'
import { Platform } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'
import { BASE_URL, STATUSBAR_HEIGHT } from './constants'
import SeenVideos from './screens/WatchTab/SeenVideos';


axios.defaults.baseURL = BASE_URL

const homeTab = () => {
	// CameraRoll.getPhotos({
	// 	first: 20,
	// 	assetType: 'Photos',
	// }).then(result => {
	// 	console.log(result)
	// })
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS, gestureResponseDistance: { vertical: 800 } }}>
			<Stack.Screen name="Home" component={Home} />

			<Stack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Comments" component={Comments} />
		</Stack.Navigator>
	)
}

const groupTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Group" component={GroupScreen} />
		</Stack.Navigator>
	)
}
const WatchScreenWithIsFocused = (props) => {
	const isFocused = useIsFocused();
	return <WatchScreen {...props} isFocused={isFocused}></WatchScreen>;
}
const watchTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Watch" component={WatchScreenWithIsFocused} />
		</Stack.Navigator>
	)
}
const profileTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Profile" component={ProfileScreen} />
		</Stack.Navigator>
	)
}
const notificationTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Notification" component={NotificationScreen} />
		</Stack.Navigator>
	)
}
const shortCutTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ShortCutIndex" component={ShortCutScreen} />
		</Stack.Navigator>
	)
}
const MainTab = () => {
	const navigationOptions = {
		style: {
			paddingTop: STATUSBAR_HEIGHT
		},
		showIcon: true,
		showLabel: false,
	}
	return (
		<Tab.Navigator tabBarOptions={navigationOptions}>
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='home' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Home" component={homeTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='users' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Group" component={groupTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='video' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Watch" component={watchTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='user-circle' size={22} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Profile" component={profileTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='bell' size={22} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Notification" component={notificationTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ tintColor, focused }) => (<Icon name='bars' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="ShortCut" component={shortCutTab} />
		</Tab.Navigator>

	);
}
function App() {
	const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}
	const navigationOptions = {
		headerShown: false,
		...TransitionPreset,
		gestureResponseDistance: {
			vertical: 800
		}
	}
	return (
		<Provider store={store}>
			<NavigationContainer ref={navigationRef} >
				<rootStack.Navigator screenOptions={navigationOptions}>
					<rootStack.Screen component={MainTab} name="MainTab" />
					<rootStack.Screen name="StoryDetail" component={StoryDetailScreen} />
					<rootStack.Screen name="PostDetail" component={PostDetail} />

					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="Marketplace" component={Marketplace} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceSearch" component={MarketplaceSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceProductDetail" component={MarketplaceProductDetail} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceCategory" component={MarketplaceCategory} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceArea" component={MarketplaceArea} />

					<rootStack.Screen options={{ gestureEnabled: false }} name="Page" component={Page} />
					<rootStack.Screen options={{ gestureEnabled: true }} name="PagePostDetail" component={PagePostDetail} />

					<rootStack.Screen options={{ gestureEnabled: false }} name="PhotoChooser" component={PhotoChooser} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="Camera" component={Camera} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="Search" component={Search} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="Result" component={Result} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="WatchOptions" component={WatchOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="WatchSearch" component={WatchSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="SeenVideos" component={SeenVideos} />
					<rootStack.Screen options={{ gestureEnabled: true }} name="WatchDetail" component={WatchDetail} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="WatchDetailList" component={WatchDetailList} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="ProfilePostOptions" component={ProfilePostOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="EditPublicInfo" component={EditPublicInfo} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="FullFriends" component={FullFriends} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="FriendOptions" component={FriendOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="FindFriends" component={FindFriends} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FriendRequests" component={FriendRequests} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="ProfileSetting" component={ProfileSetting} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="ProfileX" component={ProfileX} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="AvatarOptions" component={AvatarOptions} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="NotificationOptions" component={NotificationOptions} />

					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="GroupCategory" component={GroupCategory} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="GroupCategories" component={GroupCategories} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="GroupSearch" component={GroupSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="GroupProfile" component={GroupProfile} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="CommentsPopUp" component={CommentsPopUp} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="SharePost" component={SharePost} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="PostOptions" component={PostOptions} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FullPostTool" component={FullPostTool} />
					<rootStack.Screen name="CheckIn" component={CheckIn} />
					<rootStack.Screen name="PhotoUploader" component={PhotoUploader} />
					<rootStack.Screen name="LiveStream" component={LiveStream} />
				</rootStack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
export default App;