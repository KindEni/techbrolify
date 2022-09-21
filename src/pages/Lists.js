import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { useContext, useEffect } from 'react';
import ListContext from '../context/ListContext';
import ItemsContext from '../context/ItemContext';

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const ListLink = styled(Link)`
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  color: black;
  text-decoration: none;
`;

const Title = styled.h3`
  flex-basis: 80%;
`;

const Lists = () => {
  let navigate = useNavigate();

  const {loading, error, lists, fetchLists} = useContext(ListContext);
  const {fetchItems} = useContext(ItemsContext);


  useEffect(() => {
    // if the list array is empty fetch the list
    !lists.length && fetchLists()
  }, [fetchLists, lists])

  return (
    <>
      {navigate && <NavBar title='techbro✌ shopping list' />}
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          lists.map((list) => (
            <ListLink onClick={() => fetchItems(list.id)} key={list.id} to={`list/${list.id}`}>
              <Title>{list.title}</Title>
            </ListLink>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Lists;


/////////////////////// 2ND IMPLEMENTATION ///////////////////////////


// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import NavBar from '../components/NavBar/NavBar';
// import { useContext, useEffect } from 'react';
// //import ListContext from '../context/ListContext';
// import {useList} from '../context/ListContext';
// import ItemsContext from '../context/ItemContext';

// const ListWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-direction: column;
//   margin: 5%;
// `;

// const ListLink = styled(Link)`
//   display: flex;
//   text-align: left;
//   align-items: center;
//   padding: 1%;
//   background: lightGray;
//   border-radius: 5px;
//   padding: 10px;
//   margin-bottom: 2%;
//   color: black;
//   text-decoration: none;
// `;

// const Title = styled.h3`
//   flex-basis: 80%;
// `;

// const Lists = () => {
//   let navigate = useNavigate();

//   //const {loading, error, lists, fetchLists} = useContext(ListContext);
//   const {state : {loading, error, lists}, fetchLists} = useList();
 
//   const {fetchItems} = useContext(ItemsContext)


//   useEffect(() => {
//     // if the list array is empty fetch the list
//     !lists.length && fetchLists()
//   }, [fetchLists, lists])

//   return (
//     <>
//       {navigate && <NavBar title='techbro✌ shopping list' />}
//       <ListWrapper>
//         {loading || error ? (
//           <span>{error || 'Loading...'}</span>
//         ) : (
//           lists.map((list) => (
//             <ListLink onClick={fetchItems(list.id)} key={list.id} to={`list/${list.id}`}>
//               <Title>{list.title}</Title>
//             </ListLink>
//           ))
//         )}
//       </ListWrapper>
//     </>
//   );
// };

// export default Lists;