export default {
    BASE_URL: 'http://localhost:3333',
    getToken() {
        const data = localStorage.getItem('MyFitness.auth');
        const authData = JSON.parse(data);
        if (!authData)
            return null;
        return authData?.token;
    }
};
//# sourceMappingURL=config.js.map