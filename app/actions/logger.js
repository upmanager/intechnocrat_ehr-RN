import RNFS from 'react-native-fs';
import { logger, fileAsyncTransport, consoleTransport } from "react-native-logs";
import moment from 'moment';

const LOGFILENAME = `iHealth_${moment().format('YYYY_MM_DD')}.txt`;

var fileLogs = logger.createLogger({
    transport: consoleTransport,
});
const initFileLogs = () => {
    const config = {
        transport: fileAsyncTransport,
        transportOptions: {
            FS: RNFS,
            fileName: LOGFILENAME,
            filePath: global.log_path
        },
    };

    fileLogs = logger.createLogger(config);
}
global.log_path = `${RNFS.DownloadDirectoryPath}/logger`;
RNFS.exists(global.log_path)
    .then(res => {
        if (!res) {
            RNFS.mkdir(global.log_path)
                .then(res => {
                    if (res) {
                        initFileLogs();
                    }
                }).catch(err => {
                    console.error("mk dir", err)
                });
        } else {
            initFileLogs();
        }
    })
    .catch(err => {
        console.error(err);
    })

export const log = async (...msg) => {
    fileLogs.info(...msg);
}
export const error = async (...msg) => {
    fileLogs.error(...msg);
}
export const debug = async (...msg) => {
    fileLogs.debug(...msg);
}
export const warn = async (...msg) => {
    fileLogs.warn(...msg);
}