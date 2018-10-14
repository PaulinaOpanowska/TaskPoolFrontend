import { Injectable } from "@angular/core";
import { HttpResponseBase, HttpErrorResponse, HttpResponse } from "@angular/common/http";


@Injectable()
export class UtilitiesService {
    public static readonly captionAndMessageSeparator = ":";
    public static readonly noNetworkMessageCaption = "No Network";
    public static readonly noNetworkMessageDetail = "The server cannot be reached";
    public static readonly accessDeniedMessageCaption = "Access Denied!";
    public static readonly accessDeniedMessageDetail = "";

    public static getHttpResponseMessage(data: HttpResponseBase | any): string[] {

        let responses: string[] = [];

        if (data instanceof HttpResponseBase) {

            if (this.checkNoNetwork(data)) {
                responses.push(`${this.noNetworkMessageCaption}${this.captionAndMessageSeparator} ${this.noNetworkMessageDetail}`);
            } else {
                const responseObject = this.getResponseBody(data);

                if (responseObject && (typeof responseObject === 'object' || responseObject instanceof Object)) {

                    for (const key in responseObject) {
                        if (key) {
                            responses.push(`${key}${this.captionAndMessageSeparator} ${responseObject[key]}`);
                        } else if (responseObject[key]) {
                            responses.push(responseObject[key].toString());
                        }
                    }
                }
            }

            if (!responses.length && this.getResponseBody(data)) {
                responses.push(`${data.statusText}: ${this.getResponseBody(data).toString()}`);
            }
        }

        if (!responses.length) {
            responses.push(data.toString());
        }

        if (this.checkAccessDenied(data)) {
            responses.splice(0, 0, `${this.accessDeniedMessageCaption}${this.captionAndMessageSeparator} 
            ${this.accessDeniedMessageDetail}`);
        }


        return responses;
    }

    public static getResponseBody(response: HttpResponseBase) {
        if (response instanceof HttpResponse) {
            return response.body;
        }

        if (response instanceof HttpErrorResponse) {
            return response.error || response.message || response.statusText;
        }
    }

    public static checkNoNetwork(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 0;
        }

        return false;
    }

    public static checkAccessDenied(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 403;
        }

        return false;
    }

    public static checkNotAuthorized(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 401;
        }

        return false;
    }


    public static checkNotFound(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 404;
        }

        return false;
    }

    public static splitInTwo(text: string, separator: string): { firstPart: string, secondPart: string } {
        const separatorIndex = text.indexOf(separator);

        if (separatorIndex === -1) {
            return { firstPart: text, secondPart: null };
        }

        const part1 = text.substr(0, separatorIndex).trim();
        const part2 = text.substr(separatorIndex + 1).trim();

        return { firstPart: part1, secondPart: part2 };
    }

}