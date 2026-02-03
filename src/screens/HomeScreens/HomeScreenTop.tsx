import { View, Text, FlatList, StyleSheet,Image, Dimensions, ImageStyle } from 'react-native'
import React from 'react'
import { categories, banner, banners } from '../../mockdata/mockData'
import { colors } from '../../styles/colors'
import Carousel from 'react-native-reanimated-carousel'
/**
 * ProductCategory component -displays the product category list in horizontal 
 * @returns ProductCategory view
 */
interface ProductCategoryProps{
  data: { 
    id: number; 
    name: string; 
    image: string }[];
};
interface CarouselBannerProps {
  imageStyle?:ImageStyle;    
  data: { id: number; image: string }[];
}
const ProductCategory: React.FC<ProductCategoryProps> = ({ data }) => {
    return(
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>(
            <View style={styles.itemContainer}>
                <Image
                  source ={{uri:item.image}}
                  style={styles.imageContainer}
                  resizeMode="cover"
                />
                <Text>{item.name}</Text>
            </View>
          )}

        />
    )
}

/**
 * Displays the banners in horizontal
 * @returns Banners component
 */
const BannerScroll: React.FC<{ data: { id: number; image: string }[] }> = ({ data }) => {
    return(
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem ={({item}) =>(
            <View style={styles.bannerItemContainer}>
                <Image
                  source={{uri: item.image}}
                  style={styles.bannerImageContainer}
                  resizeMode="cover"
                />
            </View>
        )}
      />
    )
}

/**
 * CarouselComponent 
 * Displays a horizontal carousel of banners with autoplay functionality.
 * @returns CarouselBanner component
 */
//get screen with to dynamically calculate the carousel item width
const {width: screenWidth} = Dimensions.get('window');
const CarouselBanner: React.FC<CarouselBannerProps> = ({ data, imageStyle }) => {
    return(
     <View>
        <Carousel
          width ={screenWidth -15}
          height={180}
          autoPlay={true}
          autoPlayInterval={4000}
          data={data}
          renderItem={({item}) =>(
            <View key={item.id} style={styles.bannerItemContainer}>
                <Image
                  source={{uri: item.image}}
                  style={[imageStyle,styles.carouselBannerImage]}
                  resizeMode='cover'
                />
            </View>    
          )}
        />
     </View>
    )
}


const HomeScreenTop:React.FC = () => {
  return (
    <View>
     <ProductCategory data={categories}/>
     <CarouselBanner data={banners}/>
     <BannerScroll data={banner}/>
     <CarouselBanner data={banners}  imageStyle={{height:200}}/>
     <ProductCategory data={categories}/>
     <BannerScroll data={banner}/>


    </View>
  )
}

export default HomeScreenTop;

const styles= StyleSheet.create({
    itemContainer:{
      marginHorizontal:5,
      marginBottom:10,
    },
    imageContainer:{
      width:65,
      height:65,
      borderRadius:50,
      borderColor:colors.grey,
      borderWidth:2,
      backgroundColor:colors.productCategoryBackground,
      shadowRadius: 3,
      elevation: 3,

    },
    bannerItemContainer:{
      marginHorizontal:5,
      marginVertical:5
    },
    bannerImageContainer:{
      width:270,
      height:160,
      borderRadius:15,
      borderColor:colors.grey,
      borderWidth:2,
      backgroundColor:colors.productCategoryBackground,
      marginRight:5,
    },
    carouselBannerImage:{
    //   width:368,  
      height:170,
      borderRadius:15,
      borderWidth:2,
      borderColor:colors.grey,
      backgroundColor:colors.productCategoryBackground
    }

})