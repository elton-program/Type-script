import { deleteProduct } from "../services/api";

export const useDelete = () => {
  const Delete = async (id: number) => {
    try {
      await deleteProduct(id);
      console.log("Mahsulot o'chirildi!");
    } catch (error) {
      console.log(error || "Error boldi");
    }
  };

  return { Delete };
};