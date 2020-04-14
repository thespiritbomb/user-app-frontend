<template>
    <div>
        <div class="media">
            <div class="media-left">
                <span class="glyphicon glyphicon-user font45"></span> 
            </div>
            <div class="media-body">
                <h4 class="media-heading">
                    {{ formUser.name }}
                    <small>
                        <i>Submited on {{ formUser.submitDate }}</i>
                    </small>
                </h4>
                <p>
                    <span class="label label-primary">Phone {{ formUser.contact }}0</span>
                    <span class="label label-info">{{ formUser.email }}</span>
                    <span class="label label-danger">Date of Birth {{ formUser.dob }}</span>
                    <span class="label label-default">{{ formUser.userHash }}</span>
                </p>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    name: "form-user-item",
    props: {
        formUser: {
            type: Object,
            required: true
        }
    }
};
</script>

<style>
    .font45 {
        font-size:45px;
    }
</style>
