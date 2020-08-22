import React, { Component } from "react";
import './adminpage.style.css'
import ForBiddenPage from "./forbiddenpage.component"
import { BoxLoading } from 'react-loadingg'
import axios from "axios";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = { product: { name: '', price: '', imageUrl: '' }, listProduct: [], isAdmin: false, isLoading: true , showingAlert: false};
    this.handleChangeProductName = this.handleChangeProductName.bind(this);
    this.handleChangeProductPrice = this.handleChangeProductPrice.bind(this);
    this.handleChangeProductImageUrl = this.handleChangeProductImageUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeProductName(event) {
    this.setState({ product: { name: event.target.value, price: this.state.product.price, imageUrl: this.state.product.imageUrl } });
  }

  handleChangeProductPrice(event) {
    this.setState({ product: { name: this.state.product.name, imageUrl: this.state.product.imageUrl, price: event.target.value } });
  }

  handleChangeProductImageUrl(event) {
    this.setState({ product: { name: this.state.product.name, imageUrl: event.target.value, price: this.state.product.price } });
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post(`/lessons/newLesson`, this.state.product)
      .then((res) => {
        this.setState({listLesson: [...this.state.listLesson,res.data]})
      })
      .catch((error) => console.log(error));
    this.setState({product: { name: '', content: '', level: '' }})
  }

  onDeleteLesson(id){
    axios.delete(`/lessons/${id}`)
      .then((res) => {
        var les = this.state.listLesson.find(product => {
          return product._id === id
        })
        var indexLes = this.state.listLesson.indexOf(les);
        this.setState({listLesson: [...this.state.listLesson.slice(0,indexLes),...this.state.listLesson.slice(indexLes+1)]})
        this.setState({
          showingAlert: true
        });
        setTimeout(() => {
          this.setState({
            showingAlert: false
          });
        }, 2000);
      })
      .catch((error) => console.log(error));
  }

  onUpdateLesson(event,id){
    var childNodes = event.target.parentElement.parentElement.parentElement.childNodes
    var product = {name : childNodes[1].innerText, content: childNodes[2].innerText, level: childNodes[3].innerText}
    axios.put(`/lessons/updateLesson/${id}`,product)
      .then((res) => {
        var les = this.state.listLesson.find(item => {
          return item._id === id
        })
        var indexLes = this.state.listLesson.indexOf(les);
        this.setState({listLesson: [...this.state.listLesson.slice(0,indexLes),res.data,...this.state.listLesson.slice(indexLes+1)]})
        this.setState({
          showingAlert: true
        });
        setTimeout(() => {
          this.setState({
            showingAlert: false
          });
        }, 2000);
      })
      .catch((error) => console.log(error));
  }

  ondblclick(event){
    event.target.contentEditable=true;
    event.target.focus();
  }

  componentDidMount() {
    // axios.get(`/admin`)
    // .then((res) => {
    //   this.setState({isAdmin: true})
    //   axios.get(`/lessons`)
    //   .then((res) => {
    //     this.setState({ listLesson: res.data, isLoading: false });
    //   })
    //   .catch((error) => console.log(error));

    // }).catch(err => {
    //   this.setState({isAdmin: false})
    //   this.setState({isLoading: false})
    //   console.log(err)
    // })
    this.setState({isLoading: false, isAdmin: true})
  }

  render() {
    const { listProduct, isAdmin, isLoading, showingAlert  } = this.state;
    if(isAdmin && !isLoading)
    return (
      <div>
        <div className="container">
        <div className={`alert alert-success showingAlert ${showingAlert ? "alert-active" : "alert-close"}`} style={{ width: 600, margin: "10px auto 0" }} role="alert">
        Lessons has been updated
      </div>
          <div className="row">
            <form onSubmit={this.handleSubmit} id="formHeader" className="d-flex">
              <div className="leftForm d-flex flex-column justify-content-between">
                <input value={this.state.product.name} onChange={this.handleChangeProductName} type="text" placeholder="Name" className="inputLeft" />
                <input value={this.state.product.price} onChange={this.handleChangeProductPrice} type="text" placeholder="Price" className="inputLeft" />
              </div>
              <div className="centerForm d-flex flex-column justify-content-center">
                <button type="submit">Add</button>
              </div>
              <div className="rightForm d-flex flex-column justify-content-center">
                <input value={this.state.product.imageUrl} onChange={this.handleChangeProductImageUrl} type="text" placeholder="Image" className="inputLeft" />
              </div>
            </form>
          </div>
          <div className="row tableAdmin">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listProduct.map((product,index) =>
                  <tr key={product._id}>
                    <th scope="row">{index+1}</th>
                    <td onDoubleClick={this.ondblclick}>{product.name}</td>
                    <td onDoubleClick={this.ondblclick}>{product.price}</td>
                    <td onDoubleClick={this.ondblclick}>{product.imageUrl}</td>
                    <td>
                      <div className="rowAction">
                        <button onClick={() => this.onDeleteLesson(product._id)} className="deleteAction d-flex align-items-center justify-content-between">
                          Delete<i className="fas fa-trash-alt" />
                        </button>
                        <button onClick={(event) => this.onUpdateLesson(event,product._id)} className="updateAction d-flex align-items-center justify-content-between">
                          Update<i className="fas fa-edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
    else if(!isAdmin && !isLoading)
    return (
      <ForBiddenPage />
    )
    else
    return (
      <BoxLoading />
    )
  }
}

export default AdminPage;