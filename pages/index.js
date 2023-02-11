import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import database from "../utils/database";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { useMediaQuery } from "react-responsive";
import ProductSwiper from "@/components/productsSwiper";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";

export default function Home({ country, products }) {
  // console.log("product", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width: 850px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  console.log(session);
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#f15f6f"
            />
          </div>
          <ProductSwiper products={women_swiper} header="Womens" />
          <ProductSwiper products={gamingSwiper} header="Gaming" />
          <ProductSwiper
            products={homeImprovSwiper}
            header="Home Improvements"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  database.connectToDatabase();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  console.log(products);

  let data = await axios
    .get("https://api.ipregistry.co/?key=ljlzro0d32a4who5")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "United Kingdom",
        flag: "https://cdn.pixabay.com/photo/2015/11/06/13/29/union-jack-1027898__480.jpg",
      },
    },
  };
}
