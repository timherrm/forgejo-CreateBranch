class ForgejoAPI {
    constructor(api_url, token, debug = false) {
        this.api_url = api_url;
        this.token = token;
        this.debug = debug;
    }

    async CreateBranch(repository,new_branch_name,old_ref_name) {
        const requestBody = {};
        if (new_branch_name) requestBody.new_branch_name = new_branch_name;
        if (old_ref_name) requestBody.old_ref_name = old_ref_name;

        // Debug output
        if (this.debug) {
            console.log('CreateBranch payload:', requestBody);
        }

        const response = await this._makeRequest(
            `/repos/${repository}/branches`,
            'POST',
            requestBody
        );
        return response.data;
    }

    async _makeRequest(endpoint, method, data) {
        const url = `${this.api_url}${endpoint}`;
        const options = {
            method,
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            data
        };

        if (this.debug) {
            console.log('ForgejoAPI request:', {
                url,
                method,
                headers: options.headers,
                data
            });
        }

        const axios = require('axios');
        return await axios(url, options);
    }
}

module.exports = ForgejoAPI;