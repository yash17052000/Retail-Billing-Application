import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { AddItems, fetchItems } from '../../Service/Item.Service';
import toast from 'react-hot-toast';
function ItemForm() {
    const { categories, itemsList, } = useContext(AppContext)
   
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",

    })
    const [file, setFile] = useState("")
    console.log("This is file", data);

    const handleChange = e => {
        const { name, files } = e.target
        setFile(files[0])
    };
    

    const onChangeHandler = (e) => {
        // empty for now
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })

    };

    const onSubmitHandler = (e) => {
        // empty for now
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file)
        formData.append("item", JSON.stringify(data))
        setLoading(true)
        AddItems(formData).subscribe({
            next: (res) => {
                
                    itemsList()
                                    setLoading(false)
                setData({
                    name: "",
                    category: "",
                    price: "",
                    description: "",
                })
                

            }
            , error: (err) => console.log(err),
            complete: () => console.log("complete")

        })
    };
    return (
        <div className="item-form-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-8 form-container">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        {/* <img src={window.URL.createObjectURL(new Blob([isfile], {type: "application/zip"}))} alt="" width={48} /> */}
                                        <img
                                            alt="not found"
                                            width={48}
                                            src={!file ? assets.uploadsLogo : URL.createObjectURL(file)}
                                        />


                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        multiple={true}
                                        hidden
                                        name='file'
                                        id='image'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        placeholder="Item Name"
                                        value={data.name}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="category">
                                        Category
                                    </label>
                                    <select name="categoryId" id="categoryId" className="form-control"
                                        value={data.categoryId}
                                        onChange={onChangeHandler} >
                                        <option value="Category">Select---Category</option>
                                        {
                                            categories.map((u) => <option key={u.id} value={u.categoryId}>{u.name}</option>)
                                        }

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="form-control"
                                        placeholder="&#8377;200.00"

                                        value={data.price}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Write content here.."
                                        value={data.description}
                                        onChange={onChangeHandler}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-warning w-100" onClick={onSubmitHandler}>{
                                    loading ? "Loading..." : "Save"
                                }</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemForm
