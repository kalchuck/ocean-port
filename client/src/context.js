import React, { Component } from "react";
import API from "./utils/API";

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

class UserProvider extends Component {
    state = {
        email: "",
        password: "",
        loggedIn: false,
        user: null,
        failureMessage: null
    }

    componentDidMount() {
        this.isLoggedIn();
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    handleLogin = event => {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            API.login({
                email: this.state.email,
                password: this.state.password
            }).then(user => {
                if (user.data.loggedIn) {
                    this.setState({
                        loggedIn: true,
                        user: user.data.user
                    });
                    console.log("log in successful");
                    window.location.href = '/loggedin';
                } else {
                    console.log("Something went wrong :(")
                    console.log(user);
                }
            });
        }
    }

    handleSignup = event => {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            API.signup({
                email: this.state.email,
                password: this.state.password
            }).then(user => {
                if (user.data.loggedIn) {
                    this.setState({
                        loggedIn: true,
                        user: user.data.user
                    });
                    console.log("log in successful");
                    window.location.href = '/loggedin';
                } else {
                    console.log("something went wrong :(")
                    console.log(user.data);
                    this.setState({
                        failureMessage: user.data
                    })
                }
            });
        }
    }

    isLoggedIn = ()=> {
        if (!this.state.loggedIn) {
            API.isLoggedIn().then(user => {
                if(user.data.loggedIn) {
                    this.setState({
                        loggedIn: true,
                        user: user.data.user
                    });
                } else {
                    console.log(user.data.message);
                }
            })
        }
    }

    logout = ()=> {
        if (this.state.loggedIn) {
            API.logout().then(()=> {
                console.log("logged out successfully");
                this.setState({
                    loggedIn: false,
                    user: null
                })
            })
        }
    }

    render() {
        const contextValue = {
            data: this.state,
            inputChange: this.handleInputChange,
            handleLogin: this.handleLogin,
            handleSignup: this.handleSignup,
            logout: this.logout
        }
        return (
            <UserContext.Provider value={
                contextValue
            }>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider

