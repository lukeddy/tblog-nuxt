<template>
    <div>
        <div v-if="data&&!data.status" class="alert alert-danger alert-dismissible text-center" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>{{data.msg}}</strong>
        </div>
        <div v-if="data&&data.status" class="alert alert-success alert-dismissible text-center" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>{{data.msg}}</strong>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props:['data']
    }
</script>