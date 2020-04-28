<script>
    let valid = false;
</script>

<div class="site-nav">
    App Name
    <div class="action-buttons">
        {#if valid}
            <button class="load">Load App <span class="icon-app"></span></button>
        {:else}
            <button class="red margin-right-20">Create Account</button>
            <button>Sign In</button>
        {/if}
    </div>
</div>