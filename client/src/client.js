
import { createClient } from '@sanity/client';
import imgUrlBuilder from '@sanity/image-url'
const proid=process.env.REACT_APP_SANITY_PROJECT_ID
export const client = createClient({
    dataset:'production',
    apiVersion:'2023-06-21',
    useCdn:false,
    projectId : 'ki4cc1ij',
    token:'skFUx9RSbKvB7nRqMpJLxyeUzOv0woxCdL2gCWlLQkz44GWCemU4fWTxorWzSzlAKIb4lByZZknnVe41j8jo4pfg3jVH7WYl5L31GBFCNIqEOuuPd5GnbocPVbz1VjFZKMvbA2ttdRIKlkKxtMCLw03yovQ4LcAGDWX3l3jnVptJ1s97EgEl',
})
const builder = imgUrlBuilder(client);
export const urlFor =(source)=> builder.image(source)