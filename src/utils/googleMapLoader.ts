import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: "AIzaSyCrSKSCFGitJNnkqhjW3Mksy1jGrOOxK0I",
    version: 'weekly',
    libraries: ['places'],
});


export default loader;
