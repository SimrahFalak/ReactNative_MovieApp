import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { updateSearchCount } from "@/services/appwrite";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { fetchMovies } from "../../services/api";
import useFetch from "../../services/useFetch";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const { data: movies, loading, error, refetch: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);

   useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // Call updateSearchCount only if there are results
       
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);


  useEffect(() => {
    if (searchQuery.trim()) {
       if (movies?.length! > 0 && movies?.[0]) {
          updateSearchCount(searchQuery, movies[0]);
        }
    }
  }, [movies]);


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}

        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar placeholder="Search movies..."
               value={searchQuery}
               onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }

        ListEmptyComponent={
          !loading && !error  ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim() ? "No results found" : "Search for a movie"}</Text>
            </View>
          ) : null
        }
      />

    </View>
  )
}

export default Search