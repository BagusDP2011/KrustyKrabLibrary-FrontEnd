import {
  Box,
  HStack,
  Text,
  Container,
  useToast,
  Th,
  Tr,
  Table,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../api";
import BookCart from "../components/bookCart";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [book, setBook] = useState([]);

  const toast = useToast();

  const fetchBooks = async () => {
    try {
      const collection = await axiosInstance.get("/cart");
      setBook(collection.data.data);
      // console.log(collection.data.data);
      // setBook(collection.data.data[i].Book);
      // console.log(collection.data.data[i].Book)
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/cart/${id}`);

      fetchBooks();
      toast({ title: "Post deleted", status: "info" });
    } catch (err) {
      console.log(err);
    }
  };

  const renderBooks = () => {
    return book.map((val) => {
      return (
        <BookCart
          key={val.id.toString()}
          id={val.Book.id}
          image_url={val.Book.image_url}
          title={val.Book.title}
          author={val.Book.author}
          release_year={val.Book.release_year}
          genre={val.Book.genre}
          language={val.Book.language}
          onDelete={() => deleteBtnHandler(val.id)}
        />
      );
    });
  };

  const confirmBorrowHandler = async (id) => {
    try {
      await axiosInstance.patch("/cart");
      fetchBooks();
      toast({ title: "Successfully borrowed the books", status: "info" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Box>
      <Box p={"10"}>
        <Text fontWeight="bold" fontSize="36px">
          MY CART
        </Text>
      </Box>
      <Container maxWidth="900px">
        <HStack
          spacing={8}
          shadow="md"
          display="grid"
          grid-template-columns="1fr 3fr 1fr 1fr 1fr 1fr 1fr"
          gap={"50"}
          textAlign={"center"}
          padding="20px"
        >
          <Table
            style={{ border: "1px solid", paddingTop: "100px" }}
            variant="striped"
            colorScheme="black"
            textAlign={"center"}
          >
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Release year</Th>
              <Th>Genre</Th>
              <Th>Language</Th>
              <Th>Action</Th>
            </Tr>
            {renderBooks()}
          </Table>
        </HStack>
        <Link to="/borrowed">
          <Button
            colorScheme={"green"}
            alignItems="center"
            justifyContent="center"
            width={"100%"}
            onClick={confirmBorrowHandler}
          >
            Borrow books
          </Button>
        </Link>
      </Container>
    </Box>
  );
};
export default MyCart;
