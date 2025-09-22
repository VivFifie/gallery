pipeline {
    agent any

    tools {
        nodejs "node"
    }

    environment {
        RENDER_URL     = "https://gallery-rr5f.onrender.com"
        MONGODB_URI    = credentials('mongodb-secret-uri')
        PORT           = "5000"
        NODE_ENV       = "test"
        SLACK_TOKEN    = credentials('Jenkins_slack_bot')
    }

    stages {
        stage("Clone repo") {
            steps {
                git branch: 'master', url: 'https://github.com/VivFifie/gallery.git'
            }
        }

        stage("Install dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Test") {
            steps {
                sh 'npm test'
            }
        }

        stage("Build") {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            slackSend channel: "#yourfirstname_ip1", 
                      message: "Build & deploy successful: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (<${env.BUILD_URL}|Open>) • <${env.RENDER_URL}|View on Render>",
                      tokenCredentialId: 'Jenkins_slack_bot'
            echo "Pipeline Success"
        }
        failure {
            echo "Pipeline Failed"
            emailext(
                to: 'vivkiioh@gmail.com',
                subject: "Jenkins Pipeline Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: """
                Hello,

                The Jenkins pipeline *${env.JOB_NAME}* (build #${env.BUILD_NUMBER}) has **FAILED**.

                Job: ${env.BUILD_URL}

                Check the console logs for details.

                Regards,
                Jenkins
                """
            )
        }
    }
}
