import { Link, Typography } from "@mui/material";

const Footer = () => {
    return(
        <>
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.tujuhsembilan.com/">
        Padepokan 79
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>        </>
    )
}

export default Footer;
