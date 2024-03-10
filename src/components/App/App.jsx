
import { HashRouter as Router, Route, Link } from "react-router-dom";
import HomeSearch from "../Home-Search/HomeSearch";
import Favorites from "../Favorites/Favorites";
import Header from "../Header/Header";
import Admin from "../Admin/Admin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from '@mui/system';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'FETCH_CATEGORIES'});
        dispatch({type: "FETCH_FAVORITES"});
  }, []);

  

  return (
    <Router>
      <Route path='/'>
        <Header />
      </Route>
      <Route path='/' exact>
        <Container>
          <HomeSearch />
        </Container>
        </Route>
      <Route path='/favorites'>
        <Container>
          <Favorites />
        </Container>
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>

    </Router>
  );
}


export default App;
