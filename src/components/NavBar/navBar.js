import {Container, Navbar} from "react-bootstrap";
import ResponsiveComponent from "../ResponsiveComponent";
import {ReactComponent as Burger} from "../../images/burger.svg"
import {ReactComponent as Brand} from "../../images/brand.svg"
import './nabar.css';
import {ReactComponent as Marker} from "../../images/markersvg.svg";
import {CSSTransition} from "react-transition-group";
import {FullScreenLocation} from "../FullScreen/FullScreenLocation";
import {BiSearch, BiSlider} from "react-icons/all";
import {FullScreenFilter} from "../FullScreen/FullScreenFilter";
import {getParam} from "../../api/QueryCreator";
import {withRouter} from "react-router";
import {FullScreenSearch} from "../FullScreen/fullScreenSearch";
import {Link} from "react-router-dom";
import {FullScreenUser} from "../FullScreen/FullSreenUser";

class NavBarLoc extends ResponsiveComponent {

    state = {
        loc: getParam('loc', 'Select Location', true),
        show_location: false,
        query: getParam('query', 'Search Hospital', true),
        show_search: false,
        show_filter: false,
        show_user: false,
    }

    render() {
        let {match} = this.props
        let showSearchBar = this.props.location.pathname !== '/details/' + match.params.hspId
        return (
            <Navbar collapseOnSelect expand="xl" variant="light"
                    className={"navbar  fixed-top " + (showSearchBar ? 'bg-white' : 'bg-grey')}
                    id="navbar">

                <Container className fluid={true}>
                    <div className="justify-content-start">
                        <Navbar.Toggle aria-controls="navbarSupportedContent" className="BlueBackground p-2"
                                       onClick={() => {
                                           this.setState({show_user: !this.state.show_user})
                                       }}>
                            <Burger/>
                        </Navbar.Toggle>

                        <CSSTransition classNames="user-screen" in={this.state.show_user} timeout={300}
                                       unmountOnExit>
                            <FullScreenUser close={() => {
                                this.setState({show_user: false})
                            }}/>
                        </CSSTransition>
                        <Navbar.Brand className="navbar-brand px-3">
                            <Link to={'/'}>
                                <Brand height={30} width={30}/>
                            </Link>
                        </Navbar.Brand>
                    </div>
                    {this.props.location.pathname === '/search' &&
                    <>
                        <div className="pointers" onClick={() => {
                            this.setState({show_filter: !this.state.show_filter})
                        }}><BiSlider scale={4} size={30}/>
                        </div>
                        <CSSTransition classNames="filter-screen" in={this.state.show_filter} timeout={300}
                                       unmountOnExit>
                            <FullScreenFilter close={() => {
                                this.setState({show_filter: false})
                            }}/>
                        </CSSTransition>
                    </>
                    }
                    {(this.props.location.pathname !== '/search' && showSearchBar) &&
                    <>
                        <div className="pointers" onClick={() => {
                            this.setState({show_location: !this.state.show_location})
                        }}>{this.state.loc}<Marker/>
                        </div>
                        <CSSTransition classNames="location-screen" in={this.state.show_location} timeout={300}
                                       unmountOnExit>
                            <FullScreenLocation close={() => {
                                let loc = getParam('query', 'Search Hospital')
                                this.setState({show_location: false, loc: loc})
                            }}/>
                        </CSSTransition>
                    </>
                    }


                </Container>

                {showSearchBar &&
                <>
                    <Container className="w-100 input-holder pointers m-2" onClick={() => {
                        this.setState({show_search: !this.state.show_search})
                    }}>
                        <BiSearch scale={4} size={30} className=" input-marker ml-3 mr-2"/>
                        <div
                            className="main-input searchbox fill-rest overflow-hidden"> {
                            this.props.location.pathname === '/search' ?
                                <><b>{this.state.query}</b> near <b>{this.state.loc}</b></> :
                                <b>{this.state.query}</b> || 'Search Hospital'

                        }</div>
                    </Container>
                    <CSSTransition classNames="location-screen" in={this.state.show_search} timeout={300}
                                   unmountOnExit
                    >
                        <FullScreenSearch close={() => {
                            let loc = getParam('loc', 'Select Location')
                            let query = getParam('query', 'Search Hospital')
                            this.setState({loc: loc, query: query})
                            this.setState({show_search: false})
                        }}/>
                    </CSSTransition>
                </>
                }

            </Navbar>

        )
    }

}


export const NavBar = withRouter(NavBarLoc);