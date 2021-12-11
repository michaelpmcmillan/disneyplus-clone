import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocs } from '../firebase'
import { setMovies } from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'

const Home = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    useEffect(() => {
        let recommendDocs = [];
        let newDisneyDocs = [];
        let originalDocs = [];
        let trendingDocs = [];
        getAllDocs('movies')
            .then((docs) => {
                docs.forEach(doc => {
                    switch(doc.data().type) {
                        case 'recommend': 
                            recommendDocs = [...recommendDocs, {id: doc.id, ...doc.data()}];
                            break;
                        case 'new':
                            newDisneyDocs = [...newDisneyDocs, {id: doc.id, ...doc.data()}];
                            break;
                        case 'original':
                            originalDocs = [...originalDocs, {id: doc.id, ...doc.data()}];
                            break;
                        case 'trending':
                            trendingDocs = [...trendingDocs, {id: doc.id, ...doc.data()}];
                            break;
                        default: console.log('wth is a "' + doc.data().type + '"?');
                    }
                });
                dispatch(
                    setMovies({
                        recommend: recommendDocs,
                        newDisney: newDisneyDocs,
                        original: originalDocs,
                        trending: trendingDocs
                    })
                );
            }
        );
    }, [userName, dispatch]);


    return (
        <Container>
            <ImageSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trending />
        </Container>
    );
};

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);

    &:after {
        background: url("/images/home-background.png") center center / cover
          no-repeat fixed;
        content: '';
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`

export default Home;
