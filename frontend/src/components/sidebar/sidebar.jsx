import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./sidebar.scss";
import { GiShrimp } from "react-icons/gi"
import { GoTelescope } from "react-icons/go"
import { MdOutlineDraw } from "react-icons/md"
import { MdSportsEsports } from "react-icons/md"
import { GiSewingNeedle } from "react-icons/gi"
import { BsMusicNoteBeamed } from "react-icons/bs"
import { FaTheaterMasks } from "react-icons/fa"
import { MdSportsFootball } from "react-icons/md"
import { GrTechnology } from "react-icons/gr"

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let allowedPages = ['home', 'user', 'category'];

        let display = false;

        allowedPages.forEach(page => {
            if (this.props.location.pathname.includes(page)) {display = true}
        })

        if (display === false) {return null}

        return (
            <div className="sidebar-container">
                <h1>Explore Categories</h1>
                <ul>
                    <Link to={`/category/animal-husbandry`}><li><span><GiShrimp /></span> Animal Husbandry</li></Link>
                    <Link to={`/category/astronomy`}><li><span><GoTelescope /></span> Astronomy</li></Link>
                    <Link to={`/category/drawing`}><li><span><MdOutlineDraw /></span> Drawing</li></Link>
                    <Link to={`/category/games`}><li><span><MdSportsEsports /></span> Games</li></Link>
                    <Link to={`/category/handmade`}><li><span><GiSewingNeedle /></span> Handmade</li></Link>
                    <Link to={`/category/music`}><li><span><BsMusicNoteBeamed /></span> Music</li></Link>
                    <Link to={`/category/role-play`}><li><span><FaTheaterMasks /></span> Role Play</li></Link>
                    <Link to={`/category/sports`}><li><span><MdSportsFootball /></span> Sports</li></Link>
                    <Link to={`/category/technology`}><li><span><GrTechnology /></span> Technology</li></Link>
                </ul>
            </div>
        )
    }

}

export default withRouter(SideBar);