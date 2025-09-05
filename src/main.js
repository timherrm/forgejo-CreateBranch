const core = require('@actions/core');
const ForgejoAPI = require('./forgejo');

async function run() {
    try {
        const api_url = core.getInput('api_url');
        const token = core.getInput('token');
        const repository = core.getInput('repository');
        const new_branch_name = core.getInput('new_branch_name');
        const old_ref_name = core.getInput('old_ref_name');
        const debug = core.getInput('debug') === 'true';

        const forgejo = new ForgejoAPI(api_url, token, debug);

        let result;
        result = await forgejo.CreateBranch(
            repository,
            new_branch_name,
            old_ref_name
        );
        core.setOutput('result', JSON.stringify(result, null, 2));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();