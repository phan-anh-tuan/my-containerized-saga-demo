pipeline { 
    agent any 
    stages {
        stage('Build') { 
            steps { 
                sh 'echo \'Build\'' 
                checkout([$class: 'GitSCM', branches: [[name: '*/orders-service']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'f48ba149-0edb-41f6-bd96-bd79f6f92556', url: 'https://github.com/phan-anh-tuan/my-containerized-saga-demo.git']]])
            }
        }
        stage('Test'){
            steps {
                sh 'echo \'Test\'' 
            }
        }
        stage('Deploy') {
            steps {
              sh 'echo \'Deploy\'' 
            }
        }
    }
}
