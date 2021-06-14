import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { Redirect } from 'react-router';
import { format } from 'date-fns';

const Posts = ({ setSnackBar, token }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalNumPosts, setTotalNumPosts] = useState(0);
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/posts?page=${page}&postsPerPage=${rowsPerPage}`
      )
      .then((res) => {
        setPosts(res.data.posts);
        setTotalNumPosts(res.data.totalNumPosts);
      });
  }, [page, rowsPerPage]);

  const handleDeletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/admin/post?postId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSnackBar({
          isOpen: true,
          severity: 'success',
          msg: 'Post Deleted',
        });
        setPosts(posts.filter((post) => post._id !== id));
        setTotalNumPosts(totalNumPosts - 1);
      })
      .catch((err) =>
        setSnackBar({
          isOpen: true,
          severity: 'error',
          msg: `Error: ${err.response.data.error}`,
        })
      );
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalNumPosts) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='table'>
          <TableHead>
            <TableRow>
              <TableCell>Article Title</TableCell>
              <TableCell align='right'>Author</TableCell>
              <TableCell align='right'>Post Date</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell component='th' scope='row'>
                  {post.title}
                </TableCell>
                <TableCell align='right'>{post.author}</TableCell>
                <TableCell align='right'>
                  {format(new Date(post.date), 'MM/dd/yyyy')}
                </TableCell>
                <TableCell align='right'>
                  <Button onClick={() => setRedirect(`/edit/${post._id}`)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeletePost(post._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={totalNumPosts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Posts;
