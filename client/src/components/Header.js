import React, {Component} from 'react';
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    //changes button in header depending on if auth has an key.
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (<li><a href="/auth/google" >Login with Google</a> </li>);
            default:
                return [
                    <li key="1"><Payments/></li>,
                    <li key="3" style={{margin: '0 10px'}}> Credits: {this.props.auth.credits }</li>,
                    <li key="2"><a href="/api/logout">Log out</a></li>
                ];

        }
    }

    render() {
        // Link tag states if true(returning an obejct, meaning you are signed in), if false then return / .
        return(
            <nav>
                <div className="nav-wrapper">
                <Link to={this.props.auth ? '/surveys' : '/'} 

                className="left brand-logo">Emaily
                </Link>

                <ul className="right hide-on-med-and-down">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        )
    }
}
// gets auth aka user data from global object store.
function mapStateToProps (state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header)