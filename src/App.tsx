import { useEffect, useState } from "react";
import "./App.css";
import { useProduct } from "./hooks/useProduct";
import type { Product } from "./types/product";
import { useAdd } from "./hooks/useAdd";
import { useDelete } from "./hooks/useDelete";
import { useEdit } from "./hooks/useEdit";

function App() {
  const { error, loading, product } = useProduct();
  const { Edit } = useEdit();
  const [edit, setEdit] = useState<Product | null>(null);
  const {
    error: addError,
    loading: addLoading,
    data: addData,
    addProduct,
  } = useAdd();
  const { Delete } = useDelete();
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    title: "",
    description: "",
    price: 0,
  });
  const [formData2, setFormData2] = useState<Omit<Product, "id">>({
    title: "",
    description: "",
    price: 0,
  });
  useEffect(() => {
    if (addData) {
      console.log("mahsulot qoshildi!!!!!");
    }
  }, [addData]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (product.length === 0) {
    return <div>No products found.</div>;
  }
  if (addError) {
    console.log(addError.message);
  }
  
  return (
    <div className="big">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addProduct(formData);
          setFormData({
            title: "",
            description: "",
            price: 0,
          });
        }}
      >
        <label style={{ fontSize: "24px",color:"white" }}>Add Product</label>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
        <button type="submit" className="btn" disabled={addLoading}>
          {addLoading ? (
            <p style={{ color: "white" }}>loading</p>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
      {edit && (
        <div className="modal1">
          <div className="modal2">
            <h2>Edit Product</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (edit.id !== undefined) {
                  console.log("mahsulot ozgardi EDIT!!!!!");
                  
                  await Edit(edit.id, {
                    ...formData2,
                    id: edit.id,
                  });
                }

                setEdit(null);
                setFormData2({
                  title: "",
                  description: "",
                  price: 0,
                });
              }}
            >
              <input
                type="text"
                placeholder="Title"
                value={formData2.title}
                onChange={(e) =>
                  setFormData2({
                    ...formData2,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Description"
                value={formData2.description}
                onChange={(e) =>
                  setFormData2({
                    ...formData2,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={formData2.price}
                onChange={(e) =>
                  setFormData2({
                    ...formData2,
                    price: Number(e.target.value),
                  })
                }
              />

              <button type="submit" className="btn">
                Save
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => setEdit(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {product.map((item) => (
        <div key={item.id} className="mini">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <button
            className="btn"
            onClick={async () => {
              if (item.id !== undefined) {
                await Delete(item.id);
              }
            }}
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() => {
              setEdit(item);

              setFormData2({
                title: item.title,
                description: item.description,
                price: item.price,
              });
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
