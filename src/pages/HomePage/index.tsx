import React, { useCallback, useState } from "react";
import { FlatList, View, Text, RefreshControl, Modal } from "react-native";
import { IProduct, productApi } from "../../api";
import RecieptItem from "../../components/RecipItem";
import RecipeDetails from "../../components/RecipModal";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { styles } from "./styles";


export const HomePage = () => {
  const { combinedData, loadMore, isFetching, refresh, isRefresh } = useInfiniteScroll<IProduct>(
    productApi.endpoints.getProducts.useQuery,
    { limit: 10 }
  );

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IProduct | null>(null);

  const keyExtractor = useCallback((item: IProduct) => item.id.toString(), []);

  const onLoadMore = () => {
    if (!isFetching) {
      loadMore();
    }
  };

  const handleOpenModal = (props: IProduct) => {
    setOpenModal(true);
    setModalData(props);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            {modalData && <RecipeDetails {...modalData} onClose={handleCloseModal} />}
          </View>
        </View>
      </Modal>

      <FlatList
        data={combinedData}
        contentContainerStyle={[styles.flatList]}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <RecieptItem item={item} handleOpenModal={handleOpenModal} />}
        refreshControl={(
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={refresh}
            tintColor="#000"
            titleColor="#000"
          />
        )}
        ListEmptyComponent={() =>
          <View style={styles.layout}>
            <Text style={styles.emptyTxt}>Empty list</Text>
          </View>
        }
        onEndReached={combinedData?.length === 0 ? null : onLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomePage;
